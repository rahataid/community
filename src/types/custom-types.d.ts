import { Audience, Campaign, CommunicationLog, Prisma } from '@prisma/client';
type CommunicationLogDetails = {
  sid?: string | null;
  status?: string | null;
};

export type CustomCommunicationLog = Omit<CommunicationLog, 'details'> & {
  details: CommunicationLogDetails | null;
  campaign: Pick<Campaign, 'id'>;
};

export type AudienceWithCustomDetails = Omit<Audience, 'details'> & {
  details: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    discordId?: Prisma.JsonValue | null;
    discordToken?: Prisma.JsonValue | null;
    sid?: string | null;
  } | null;
  CommunicationLog: CustomCommunicationLog[];
};

export type CampaignWithCustomDetails = Omit<Campaign, 'details'> & {
  details: {
    subject: string | null;
    body: string | null;
    message?: string | null;
    twiml?: {
      audio: {
        url?: string;
        method?: string;
      };
      ivr: {
        url?: string;
        method?: string;
      };
    };
    from?: Prisma.JsonValue | null;
    countryCode?: string | null;
    callbackUrl?: string | null;
    callbackMethod?: Prisma.JsonValue | null;
  } | null;
};
