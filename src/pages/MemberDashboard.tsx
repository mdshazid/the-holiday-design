import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  User, CreditCard, TrendingUp, MapPin, LogOut, Gift, 
  Calendar, CheckCircle2, Star, Plane, Clock, BadgePercent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import logo from '@/assets/logo.jpeg';

interface MemberProfile {
  id: string;
  full_name: string;
  phone: string | null;
  member_id: string | null;
  plan_id: string | null;
  plan_start_date: string | null;
  plan_end_date: string | null;
  total_spent: number;
  total_savings: number;
  total_trips: number;
}

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  benefits: string[];
}

const MemberDashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [plan, setPlan] = useState<MembershipPlan | null>(null);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/member-login');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/member-login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPlans();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('member_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);

      if (data?.plan_id) {
        const { data: planData } = await supabase
          .from('membership_plans')
          .select('*')
          .eq('id', data.plan_id)
          .maybeSingle();
        
        if (planData) {
          setPlan({
            ...planData,
            benefits: Array.isArray(planData.benefits) ? planData.benefits : JSON.parse(planData.benefits as string || '[]')
          });
        }
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('membership_plans')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setPlans(data?.map(p => ({
        ...p,
        benefits: Array.isArray(p.benefits) ? p.benefits : JSON.parse(p.benefits as string || '[]')
      })) || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { 
      icon: TrendingUp, 
      label: 'Total Savings', 
      value: `৳${(profile?.total_savings || 0).toLocaleString()}`,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: CreditCard, 
      label: 'Total Spent', 
      value: `৳${(profile?.total_spent || 0).toLocaleString()}`,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: MapPin, 
      label: 'Total Trips', 
      value: profile?.total_trips || 0,
      color: 'from-purple-500 to-violet-600'
    },
    { 
      icon: Star, 
      label: 'Member Status', 
      value: plan?.name || 'Free',
      color: 'from-amber-500 to-orange-500'
    },
  ];

  return (
    <>
      <Helmet>
        <title>Member Dashboard - The Holiday</title>
        <meta name="description" content="View your membership details, savings, and exclusive benefits" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border/30 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow">
                  <img src={logo} alt="The Holiday" className="h-8 w-auto rounded" />
                </div>
                <span className="font-display text-xl font-bold text-foreground hidden sm:block">
                  Member Portal
                </span>
              </a>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-muted-foreground">Welcome back,</p>
                  <p className="font-medium text-foreground">{profile?.full_name || 'Member'}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-border/50 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-primary via-primary/80 to-accent/60 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="font-display text-3xl font-bold mb-2">
                      Welcome, {profile?.full_name || 'Member'}!
                    </h1>
                    <p className="text-white/80 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Member ID: <span className="font-mono font-semibold">{profile?.member_id || 'N/A'}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {plan && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                        <Star className="w-6 h-6 mx-auto mb-1 text-amber-300" />
                        <p className="font-semibold">{plan.name} Member</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border/30"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                {plan ? 'Your Membership Benefits' : 'Choose a Membership Plan'}
              </h2>

              {plan ? (
                <div className="bg-card rounded-2xl p-6 border border-border/30">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground">{plan.name} Plan</h3>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {plan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {profile?.plan_end_date && (
                    <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Valid until: {new Date(profile.plan_end_date).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-3 gap-4">
                  {plans.map((p, index) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`bg-card rounded-2xl p-5 border transition-all hover:border-accent/50 ${
                        index === 1 ? 'border-accent ring-2 ring-accent/20' : 'border-border/30'
                      }`}
                    >
                      {index === 1 && (
                        <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full mb-3">
                          Popular
                        </span>
                      )}
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">{p.name}</h3>
                      <p className="text-3xl font-bold text-accent mb-4">
                        ৳{p.price.toLocaleString()}
                        <span className="text-sm text-muted-foreground font-normal">/year</span>
                      </p>
                      <ul className="space-y-2 mb-5">
                        {p.benefits.slice(0, 4).map((b, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${index === 1 ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}`}
                        variant={index === 1 ? 'default' : 'outline'}
                      >
                        Choose Plan
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: Plane, label: 'Book a Trip', desc: 'Browse destinations' },
                  { icon: BadgePercent, label: 'View Offers', desc: 'Exclusive member deals' },
                  { icon: Clock, label: 'Booking History', desc: 'Past transactions' },
                  { icon: User, label: 'Edit Profile', desc: 'Update your info' },
                ].map((action, i) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30 hover:border-accent/50 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <action.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{action.label}</p>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MemberDashboard;
