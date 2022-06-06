import React from "react";
import { useForm } from "react-hook-form";
import "../styles/SetupDialog.sass";
import { SetupData } from "./types";

type Props = {
    submitData: (data: SetupData) => void;
};

const SetupDialog: React.FC<Props> = ({ submitData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SetupData>();
    return (
        <div className="setupDialog">
            <form onSubmit={handleSubmit(submitData)}>
                <label>Liczba wind:</label>
                <input
                    type="number"
                    {...register("elevatorsNo", { required: true, min: 0 })}
                    id="elevatorsNoInput"
                />
                <label>Liczba pieter w windzie</label>
                <input
                    type="number"
                    {...register("floorNo", { required: true, min: 0 })}
                    id="floorNoInput"
                />
                <input type="submit" value="OK" />
            </form>
        </div>
    );
};

export default SetupDialog;
