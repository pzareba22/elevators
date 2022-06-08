import React from "react";
import { useForm } from "react-hook-form";
import "../styles/SetupDialog.sass";
import { SetupDataType } from "./types";

type Props = {
    submitData: (data: SetupDataType) => void;
};

const SetupDialog: React.FC<Props> = ({ submitData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SetupDataType>();
    return (
        <div className="setupDialog">
            <form onSubmit={handleSubmit(submitData)}>
                <label>Liczba wind:</label>
                <input
                    type="number"
                    {...register("elevatorsNo", {
                        required: true,
                        min: 1,
                        max: 64,
                    })}
                    id="elevatorsNoInput"
                    className={errors.elevatorsNo && "wrongInput"}
                />
                <label>Liczba pięter w każdej windzie</label>
                <input
                    type="number"
                    {...register("floorNo", {
                        required: true,
                        min: 2,
                        max: 32,
                    })}
                    id="floorNoInput"
                    className={errors.floorNo && "wrongInput"}
                />
                <input type="submit" value="OK" />
            </form>
        </div>
    );
};

export default SetupDialog;
