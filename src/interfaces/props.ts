import { CardType } from './card';

export interface ButtonProps {
  isFill?: boolean;
  url?: string;
  _onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardProps {
  card: CardType;
}

export interface CardDetailProps extends CardProps {
  _onClick?: Function;
}

export interface EditClickProps {
  editClick: boolean;
}
