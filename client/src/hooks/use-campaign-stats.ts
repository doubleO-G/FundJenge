import { useQuery } from "@tanstack/react-query";

interface CampaignStats {
  pledged: number;
  goal: number;
  builders: number;
  deadline?: string;
}

export function useCampaignStats() {
  return useQuery<CampaignStats>({
    queryKey: ['/api/campaign/stats'],
    refetchInterval: 10000, // Refetch every 10 seconds to show real-time progress
  });
}
