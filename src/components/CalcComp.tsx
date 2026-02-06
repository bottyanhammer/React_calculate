import { useState, useRef, useEffect } from "react";
import "./CalcComp.css";

const CalcComp: React.FC = () => {
    const [inp1, setInp1] = useState<number | string>("");
    const [inp2, setInp2] = useState<number | string>("");
    const [calc, setCalc] = useState<number | string>("");
    const [op, setOp] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);

    const inp1Ref = useRef<HTMLInputElement>(null);
    const inp2Ref = useRef<HTMLInputElement>(null);
    const opRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        console.log("Szia!");
    }, [calc]);
    

    function validate(): boolean {
        if (inp1 === "") {
            alert("Kérem, adja meg az első számot!");
            inp1Ref.current?.focus();
            return false;
        }
        if (op === "") {
            alert("Kérem, adja meg a művelet jellegét!");
            opRef.current?.focus();
            return false;
        }

        if (inp2 === "") {
            alert("Kérem, adja meg a második számot!");
            inp2Ref.current?.focus();
            return false;
        }
        return true;
    }

    function calculate(e: React.ChangeEvent) {
        e.preventDefault();
        let result: number;
        if (validate()) {
            let input1 = Number(inp1);
            let input2 = Number(inp2);
            switch (op) {
                case "+":
                    result = input1 + input2;
                    break;
                case "-":
                    result = input1 - input2;
                    break;
                case "*":
                    result = input1 * input2;
                    break;
                case "/":
                    if (input2 === 0) {
                        alert("Nullával osztás értelmezhetetlen!");
                        return;
                    }
                    result = input1 / input2;
                    break;
                default:
                    result = 0;
                    break;
            }
            setCalc(result);
            setInp1("");
            setInp2("");
            inp1Ref.current?.focus();
        }
    }
    return (
        <form onSubmit={calculate} className="bg-zinc-400 p-3 flex flex-col items-center gap-1">
            <article>
                <input type="number" name="n1" autoFocus
                    onChange={e => setInp1(e.target.value !== "" ? Number(e.target.value) : "")}
                    value={inp1}
                    ref={inp1Ref}
                />
                <select className="text-center" name="op" id=""
                    ref={opRef}
                    onChange={e => setOp(e.target.value)}
                >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                    <option value="" selected hidden
                    >Művelet</option> {/*hidden - nem választható!*/}
                </select>
                <input type="number" name="n2" id=""
                    onChange={e => setInp2(e.target.value !== "" ? Number(e.target.value) : "")}
                    value={inp2}
                    ref={inp2Ref}
                />
                <input type="number" name="result" id=""
                    value={calc}
                />
            </article>
            <button className="bg-amber-300 pt-0.5 pb-0.5 pl-1 pr-1 rounded-lg" type="submit">Számol</button>
        </form>
    )
}

export default CalcComp;