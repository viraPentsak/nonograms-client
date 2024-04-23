interface ErrorProps {
    error: unknown
}

const Error = ({error}: ErrorProps) => {
    let message = error instanceof Error
        ? error.message :
        "Error occurred. Please try again later or contact the support.";

    return (
        <div className="text-center border-l-2 border-red-400 bg-red-100">
            {message}
        </div>
    );
};

export default Error;