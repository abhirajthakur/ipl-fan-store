import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Shield, Trophy, Users } from 'lucide-react';
import { IPL_TEAMS } from '@/lib/constants';
import { FeatureCard } from '@/components/home/FeatureCard';
import { TeamCard } from '@/components/home/TeamCard';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative container mx-auto px-4 py-24">
                    <div className="text-center space-y-8">
                        <h1 className="text-6xl font-bold">
                            Welcome to IPL Fan Store
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto text-gray-200">
                            Join our exclusive community of cricket enthusiasts and get access to premium team merchandise. Get assigned to your destiny team!
                        </p>
                        <div className="space-x-4">
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                    Join Your Team
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="text-black hover:text-white border-white hover:bg-white/10">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teams Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">IPL Teams</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {IPL_TEAMS.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose IPL Fan Store?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<ShoppingBag className="w-12 h-12 text-blue-600" />}
                            title="Authentic Merchandise"
                            description="100% genuine products with official team branding and quality assurance"
                        />
                        <FeatureCard
                            icon={<Shield className="w-12 h-12 text-blue-600" />}
                            title="Secure Shopping"
                            description="Safe and secure payment options with encrypted transactions"
                        />
                        <FeatureCard
                            icon={<Trophy className="w-12 h-12 text-blue-600" />}
                            title="Exclusive Collection"
                            description="Limited edition items and signed memorabilia from your favorite teams"
                        />
                        <FeatureCard
                            icon={<Users className="w-12 h-12 text-blue-600" />}
                            title="Fan Community"
                            description="Join fellow supporters and share your passion for cricket"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
                <div className="relative container mx-auto px-4 text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to Show Your Team Spirit?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Register now and get 10% off on your first purchase! Plus, discover which IPL team destiny has chosen for you.
                    </p>
                    <Link href="/register">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                            Get Started Today
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}