-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    wallet_address TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    avatar_url TEXT,
    total_audits INTEGER DEFAULT 0,
    reputation_score FLOAT DEFAULT 0,
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create audits table
CREATE TABLE audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT NOT NULL REFERENCES profiles(wallet_address),
    contract_address TEXT NOT NULL,
    contract_name TEXT NOT NULL,
    chain_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    security_score INTEGER CHECK (security_score >= 0 AND security_score <= 100),
    report_url TEXT,
    findings JSONB DEFAULT '[]'::jsonb,
    gas_optimizations JSONB DEFAULT '[]'::jsonb,
    test_cases JSONB DEFAULT '[]'::jsonb
);

-- Create audit_comments table
CREATE TABLE audit_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES profiles(wallet_address),
    content TEXT NOT NULL,
    line_number INTEGER,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical'))
);

-- Create indexes
CREATE INDEX idx_audits_user_id ON audits(user_id);
CREATE INDEX idx_audits_contract_address ON audits(contract_address);
CREATE INDEX idx_audit_comments_audit_id ON audit_comments(audit_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audits_updated_at
    BEFORE UPDATE ON audits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audit_comments_updated_at
    BEFORE UPDATE ON audit_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (wallet_address = auth.uid());

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (wallet_address = auth.uid());

CREATE POLICY "Audits are viewable by everyone"
    ON audits FOR SELECT
    USING (true);

CREATE POLICY "Users can create their own audits"
    ON audits FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own audits"
    ON audits FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Audit comments are viewable by everyone"
    ON audit_comments FOR SELECT
    USING (true);

CREATE POLICY "Users can create audit comments"
    ON audit_comments FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comments"
    ON audit_comments FOR UPDATE
    USING (user_id = auth.uid());
