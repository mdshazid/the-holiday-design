-- Membership plans table
CREATE TABLE public.membership_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 12,
  benefits JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Member profiles table
CREATE TABLE public.member_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  member_id TEXT UNIQUE,
  plan_id UUID REFERENCES public.membership_plans(id),
  plan_start_date DATE,
  plan_end_date DATE,
  total_spent DECIMAL(10,2) DEFAULT 0,
  total_savings DECIMAL(10,2) DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Member transactions/usage history
CREATE TABLE public.member_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES public.member_profiles(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL, -- 'booking', 'discount', 'bonus'
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for membership_plans (publicly readable)
CREATE POLICY "Anyone can view active membership plans" 
ON public.membership_plans 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for member_profiles
CREATE POLICY "Users can view their own profile" 
ON public.member_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.member_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for member_transactions
CREATE POLICY "Users can view their own transactions" 
ON public.member_transactions 
FOR SELECT 
USING (
  member_id IN (
    SELECT id FROM public.member_profiles WHERE user_id = auth.uid()
  )
);

-- Function to handle new user signup with profile creation
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public 
AS $$
DECLARE
  new_member_id TEXT;
BEGIN
  -- Generate a unique member ID like "TH-2024-00001"
  new_member_id := 'TH-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                   LPAD((SELECT COUNT(*) + 1 FROM public.member_profiles)::TEXT, 5, '0');
  
  INSERT INTO public.member_profiles (user_id, full_name, member_id)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'full_name', 'Member'),
    new_member_id
  );
  RETURN new;
END;
$$;

-- Trigger for auto-creating member profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_member();

-- Insert sample membership plans
INSERT INTO public.membership_plans (name, description, price, duration_months, benefits) VALUES
('Silver', 'Perfect for occasional travelers', 5000, 12, '["5% discount on all packages", "Priority booking", "Free travel insurance", "24/7 support"]'),
('Gold', 'Best for regular travelers', 15000, 12, '["10% discount on all packages", "Priority booking", "Free visa assistance", "Free travel insurance", "Airport pickup", "24/7 dedicated support"]'),
('Platinum', 'Ultimate travel experience', 30000, 12, '["15% discount on all packages", "VIP priority booking", "Free visa processing", "Premium travel insurance", "Airport VIP lounge access", "Free airport transfers", "Personal travel concierge", "Exclusive member events"]');