import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Youtube } from "lucide-react";
import { motion } from "motion/react";

const SocialNetworkIcons = () => {
  return (
      <div className="mt-6 flex justify-center gap-6">
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-700"
          aria-label="Facebook"
        >
          <Facebook className="h-8 w-8 text-green-900" />
        </a>

        {/* X / Twitter */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-700"
          aria-label="X"
        >
          <Twitter className="h-8 w-8 text-green-900" />
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-700"
          aria-label="YouTube"
        >
          <Youtube className="h-8 w-8 text-green-900" />
        </a>
      </div>
  );
};

export default SocialNetworkIcons;
