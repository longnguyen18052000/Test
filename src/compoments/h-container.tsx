import cls from "classnames";
import { ReactNode } from "react";
import styles from "./h-container.module.scss";

type IContainer = {
  children: ReactNode,
  className?: string,
};

const HContainer = ({ children, className }: IContainer) => {
  return (
    <div className={cls(styles.container, className)}>
      {children}
    </div>
  );
};

export default HContainer