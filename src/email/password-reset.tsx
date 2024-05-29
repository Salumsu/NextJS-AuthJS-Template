import { appConfig } from "@/config/app";
import { RESET_PASSWORD_ROUTE } from "@/routes";

interface ResetPasswordEmailProps {
  email: string;
  token: string;
}

export const ResetPasswordEmail = ({
  email,
  token,
}: ResetPasswordEmailProps) => {
  const url = new URL(`${RESET_PASSWORD_ROUTE}?token=${token}`, appConfig.host);

  return (
    <div>
      <header>
        <h1>Hello!</h1>
        <p>{email}</p>
      </header>

      <main>
        <p>
          Please click <a href={url.href}>here</a> to reset your password
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
