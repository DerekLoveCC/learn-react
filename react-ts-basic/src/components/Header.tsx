import { ReactNode } from "react";

type ImageProps = {
  src: string;
  alt: string;
};

type HeaderProps = {
  img: ImageProps;
  children: ReactNode;
};

export default function Header({ img, children }: HeaderProps) {
  return <image {...img}>{children}</image>;
}
