import express from "express";
import { buildTokenWithUid, Role } from "./RtcTokenBuilder";
import dotenv from "dotenv";
dotenv.config();

const expirationTimeInSeconds = 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

class TokenController {
  get = async (req, res, next) => {
    const {
      query: { channel, userId, isHost },
    } = req;
    const token = buildTokenWithUid(
      process.env.appID,
      process.env.appCertificate,
      channel,
      userId,
      isHost ? Role.PUBLISHER : Role.ATTENDEE,
      privilegeExpiredTs
    );

    res.json({
      ok: true,
      token:
        "006967c262fe6b8417bab8058645362e2daIADbQsDdGxxjMURk5vuAQhmn1+Fq2c7vvjBADvjAtbYwo2U1u1UAAAAAEAC5X9YGyCpSYAEAAQDIKlJg",
    });
  };
}

export default new TokenController();
