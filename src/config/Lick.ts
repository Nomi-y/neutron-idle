export function getLickMessage(licks: number): string {
    const tier = Math.min(Math.floor(licks / 30), 3);
    const messages = [
        [
            "Your tongue tingles unpleasantly.",
            "That tasted like burning pennies.",
            "Your dentist would cry if they saw this."
        ],
        [
            "Your teeth are now slightly radioactive.",
            "You can now see in the dark (temporarily).",
            "Your tongue has developed its own glow."
        ],
        [
            "The Geiger counter in the corner is screaming.",
            "You've developed a taste for gamma radiation.",
            "Your saliva could power a small city."
        ],
        [
            "The atoms in your tongue have achieved enlightenment.",
            "You briefly saw the face of God (it looked concerned).",
            "The universe filed a restraining order against your tongue."
        ]
    ];

    const randomIndex = Math.floor(Math.random() * messages[tier].length);
    return messages[tier][randomIndex];
}
