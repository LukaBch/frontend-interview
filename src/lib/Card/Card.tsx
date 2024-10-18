import classnames from "classnames";
import { cloneElement, ReactElement, ReactNode } from "react";
import BaseCard, { CardActionProps } from "./BaseCard";
import styles from "./Card.module.css";

export interface CommonCardProps {
  chip?: ReactElement;
  title: string;
  subtitle?: string | ReactElement;
  footer?: ReactNode;
  className?: string;
  titleTag?: "h2" | "h3";
}

type DateOrIcon =
  | { date?: Date; icon?: never }
  | { icon?: ReactElement; date?: never };

type CardProps = CommonCardProps & CardActionProps & DateOrIcon;

const Card = ({
  chip,
  date,
  icon,
  title,
  subtitle,
  footer = "",
  className,
  href,
  onClick,
  titleTag: TitleTag = "h2",
}: CardProps) => {
  const actionProps = onClick ? { onClick } : { href };
  return (
    <BaseCard
      className={classnames(className, styles.card)}
      // Props spreading is used here to avoid repeating the whole
      // component. It is safe because we define the content just above.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...actionProps}
    >
      {chip
        ? cloneElement(chip, {
            className: classnames(styles.chip, chip.props.className),
          })
        : null}
      {date ? (
        <div className={styles.date}>
          {date.toLocaleDateString("en", {
            dateStyle: "medium",
          })}
        </div>
      ) : null}
      {icon
        ? cloneElement(icon, {
            className: classnames(icon.props.className, styles.icon),
          })
        : null}
      <TitleTag className={styles.title}>{title}</TitleTag>
      {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
      {footer && <div className={styles.footer}>{footer}</div>}
    </BaseCard>
  );
};

export default Card;
