import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

const ButtonTele = () => {
  return (
    <Link href="https://t.me/+pBH5WCVyC0wxNWRl" className="absolute">
      <Button
        isIconOnly
        aria-label="Telegram"
        variant="shadow"
        color="primary"
        className="fixed bottom-5 z-50 right-5"
      >
        <Image
          src="/tele.webp"
          alt="Telegram channel dia imamku"
          width={24}
          height={24}
        />
      </Button>
    </Link>
  );
};

export default ButtonTele;
