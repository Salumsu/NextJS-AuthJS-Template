import { appConfig } from "@/config/app";
import { ACCOUNT_VERIFICATION_ROUTE, TWO_FACTOR_AUTH_ROUTE } from "@/routes";

interface TwoFactorAuthEmailProps {
  email: string;
  code: string;
  token: string;
}

export const TwoFactorAuthEmail = ({
  email,
  code,
  token,
}: TwoFactorAuthEmailProps) => {
  const url = new URL(
    `${TWO_FACTOR_AUTH_ROUTE}?token=${token}`,
    appConfig.host
  );

  return (
    <div>
      <header>
        <h1>Hello!</h1>
        <p>{email}</p>
      </header>

      <main>
        <p>Here is your 2 factor auth code</p>
        <p>{code}</p>

        <p>Lost your page?</p>
        <p>
          Click <a href={url.href}>here</a> to come back
        </p>

        <p>Please disregard this email if it wasn&quot;t you</p>
        <p>Please do not share this code to anyone</p>
      </main>

      <footer>
        <p>Thank you</p>
        <p>{appConfig.name} Team</p>
      </footer>
    </div>
  );
};
