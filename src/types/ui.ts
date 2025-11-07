// Alert
export type AlertProps = {
  visible: boolean;
  type?: string;
  text: string;
};

export type AlertStyle = {
  container: string;
  text: string;
};

// AnimeButton
type AnimeButtonBaseProps = {
  text: string;
  disabled?: boolean;
  className?: string;
  point?: boolean;
};

export type AnimeButtonProps =
  | (AnimeButtonBaseProps & {
      buttonType?: "button";
      type?: "button" | "submit" | "reset";
      onClick?: () => void;
      href?: never;
    })
  | (AnimeButtonBaseProps & {
      buttonType?: "link" | "a";
      onClick?: never;
      type?: never;
      href: string;
    });

// AnimeText
export type AnimeTextProps = {
  text: string[];
  delay?: number;
  className?: string;
};

// SectionTitle
export interface SectionTitleProps {
  text: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
