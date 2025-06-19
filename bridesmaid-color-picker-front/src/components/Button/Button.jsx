import styles from './Button.module.css';

function Button(size, onclickFunction, text) {

    const getSizeStyles = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large
    }

    const buttonProps = `${getSizeStyles[size] || getSizeStyles.medium} `

    return (
        <button
            type="submit"
            className={buttonProps}
            onClick={() => onclickFunction}
        >
        {text}
        </button>
    )
}

export default Button;