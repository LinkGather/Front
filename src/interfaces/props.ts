import { CardType } from './card';

export interface ButtonProps {
  isFill?: boolean;
  url?: string;
  _onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CloseButtonProps {
  _onClick?: React.MouseEventHandler<HTMLElement | SVGElement>;
}

export interface CardProps {
  card?: CardType;
}

export interface CardDetailProps extends CardProps {
  _onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface EditClickProps {
  editClick?: boolean;
}

export interface Click {
  click?: boolean;
}

export interface NavBarProps {
  searched?: boolean;
}

export interface TitleProps {
  text: string;
}
