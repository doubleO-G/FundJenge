import { useQuery } from "@tanstack/react-query";

interface CampaignStats {
  pledged: number;
  goal: number;
  builders: number;
  deadline?: string;
}

export function useCampaignStats() {
  return useQuery<CampaignStats>({
    queryKey: ['campaign-stats'],
    queryFn: async () => {
      const response = await fetch('/campaign-stats.json');
      if (!response.ok) throw new Error('Failed to fetch campaign stats');
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
  });
}
