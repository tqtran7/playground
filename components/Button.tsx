'use client';

interface ButtonProp {
    label: string;
    onClick: () => void;
}

const Button : React.FC<ButtonProp> = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;