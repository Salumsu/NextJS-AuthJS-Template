import { appConfig } from "@/config/app";
import { ACCOUNT_VERIFICATION_ROUTE } from "@/routes";

interface AccountVerificationEmailProps {
  email: string;
  token: string;
}

export const AccountVerificationEmail = ({
  email,
  token,
}: AccountVerificationEmailProps) => {
  const url = new URL(
    `${ACCOUNT_VERIFICATION_ROUTE}?token=${token}`,
    appConfig.host
  );

  return (
    <div>
      <header>
        <h1>Hello!</h1>
        <p>{email}</p>
      </header>

      <main>
        <p>
          Please click <a href={url.href}>here</a> to verify your account
        </p>
        <p>Please disregard this email if it wasn&quot;t you</p>
      </main>

      <footer>
        <p>Thank you</p>
        <p>{appConfig.name} Team</p>
      </footer>
    </div>
  );
};
