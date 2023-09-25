import cls from "classnames";
import HContainer from "../compoments/h-container";
import styles from "./h-section-container.module.scss";

interface HSectionContainerProps {
  children: any,
  className?: string,
  containerClassName?: string,
}

const HSectionContainer = (props: HSectionContainerProps) => {
  const { children, className, containerClassName } = props;
  return (
    <section className={cls(styles["section-container"], className)}>
      <HContainer className={containerClassName}>
        {children}
      </HContainer>
    </section>
  );
};

export default HSectionContainer;