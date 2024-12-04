interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-6 text-center space-y-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors">
            <div className="flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}