-- Active: 1683170493500@@127.0.0.1@5432@rahat-community
ALTER TABLE tbl_communities
RENAME COLUMN "totalDonations_usd" TO "fundRaisedUsd";
