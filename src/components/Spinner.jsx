import { BarLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderRadius: "10px",
};

const Spinner = ({ color = "#3b82f6", size = 150 }) => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner-card">
                
                <BarLoader
                    color={color}
                    height={6}
                    width={size}
                    cssOverride={override}
                    aria-label="Loading..."
                />

                <p className="spinner-text">Loading crypto data...</p>
            </div>
        </div>
    );
};

export default Spinner;