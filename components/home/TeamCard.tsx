import Image from 'next/image';
import { IPLTeam } from '@/lib/types';

interface TeamCardProps {
    team: IPLTeam;
}

export function TeamCard({ team }: TeamCardProps) {
    return (
        <div
            className="group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: team.colors.primary }}
        >
            <div className="aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <Image
                    src={team.logo}
                    alt={team.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white font-semibold text-lg">{team.name}</h3>
                </div>
            </div>
        </div>
    );
}