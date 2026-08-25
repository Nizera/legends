-- ============================================
-- LEILÃO LEGENDS - Database Schema (Idempotente)
-- Pode ser executado várias vezes sem erro
-- ============================================

-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USUÁRIOS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL UNIQUE,
  cpf TEXT,
  email TEXT,
  endereco_rua TEXT,
  endereco_numero TEXT,
  endereco_complemento TEXT,
  endereco_bairro TEXT,
  endereco_cidade TEXT,
  endereco_estado TEXT,
  endereco_cep TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. SESSÕES DE LEILÃO (uma por dia)
-- ============================================
CREATE TABLE IF NOT EXISTS auction_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  titulo TEXT NOT NULL,
  status TEXT DEFAULT 'preparando' CHECK (status IN ('preparando', 'ao_vivo', 'encerrada')),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. LOTES
-- ============================================
CREATE TABLE IF NOT EXISTS lots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES auction_sessions(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  fotos TEXT[] DEFAULT '{}',
  lance_inicial NUMERIC(10,2) NOT NULL,
  incremento_minimo NUMERIC(10,2) DEFAULT 5,
  arremate_imediato NUMERIC(10,2),
  inicio TIMESTAMPTZ,
  fim TIMESTAMPTZ,
  duracao_segundos INT DEFAULT 180,
  status TEXT DEFAULT 'aguardando' CHECK (status IN ('aguardando', 'ao_vivo', 'encerrado')),
  vencedor_id UUID REFERENCES users(id),
  lance_vencedor NUMERIC(10,2),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. LANCES
-- ============================================
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lot_id UUID NOT NULL REFERENCES lots(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  valor NUMERIC(10,2) NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lot_id, valor)
);

-- ============================================
-- 5. MENSAGENS DO CHAT
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES auction_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  conteudo TEXT NOT NULL,
  tipo TEXT DEFAULT 'texto' CHECK (tipo IN ('texto', 'lance', 'sistema', 'llm')),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. PAGAMENTOS
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lot_id UUID NOT NULL REFERENCES lots(id),
  user_id UUID NOT NULL REFERENCES users(id),
  valor NUMERIC(10,2) NOT NULL,
  comprovante_url TEXT,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. ÍNDICES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_lots_session ON lots(session_id);
CREATE INDEX IF NOT EXISTS idx_bids_lot ON bids(lot_id);
CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_payments_lot ON payments(lot_id);

-- ============================================
-- 8. RLS (Row Level Security)
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auction_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 9. POLICIES
-- ============================================

-- Drop existing policies to avoid duplicates
DROP POLICY IF EXISTS "Leilões ativos são públicos" ON auction_sessions;
DROP POLICY IF EXISTS "Lotes ativos são públicos" ON lots;
DROP POLICY IF EXISTS "Mensagens do chat são públicas" ON messages;
DROP POLICY IF EXISTS "Usuários podem criar lances" ON bids;
DROP POLICY IF EXISTS "Usuários podem enviar mensagens" ON messages;
DROP POLICY IF EXISTS "Usuários podem atualizar próprio perfil" ON users;
DROP POLICY IF EXISTS "Usuários podem criar próprio perfil" ON users;
DROP POLICY IF EXISTS "Lotes para seleção são públicos" ON lots;
DROP POLICY IF EXISTS "Admin pode gerenciar sessões" ON auction_sessions;
DROP POLICY IF EXISTS "Admin pode gerenciar lotes" ON lots;
DROP POLICY IF EXISTS "Admin pode ver pagamentos" ON payments;
DROP POLICY IF EXISTS "Usuários podem ver próprios pagamentos" ON payments;
DROP POLICY IF EXISTS "Lances são públicos para leitura" ON bids;

-- Leitura pública
CREATE POLICY "Leilões ativos são públicos" ON auction_sessions
  FOR SELECT USING (status IN ('ao_vivo', 'encerrada'));

CREATE POLICY "Lotes para seleção são públicos" ON lots
  FOR SELECT USING (true);

CREATE POLICY "Mensagens do chat são públicas" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Lances são públicos para leitura" ON bids
  FOR SELECT USING (true);

-- Inserts autenticados
CREATE POLICY "Usuários podem criar próprio perfil" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem criar lances" ON bids
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem enviar mensagens" ON messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admin pode gerenciar sessões" ON auction_sessions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin pode gerenciar lotes" ON lots
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admin pode ver pagamentos" ON payments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Usuários podem ver próprios pagamentos" ON payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar pagamentos" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
