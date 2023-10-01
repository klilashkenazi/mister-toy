import { ToyMsgsPreview } from "./ToyMsgsPreview";

export function ToyMsgsList({ toy }) {
    return (
        <ul >
            {toy.msgs && toy.msgs.map(msg =>
                <li key={msg.id}>
                    <ToyMsgsPreview msg={msg} />
                </li>
            )}
        </ul>
    )
}