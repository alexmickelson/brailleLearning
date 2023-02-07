braille = {
    " ": "⠀",
    "!": "⠮",
    '"': "⠐",
    "#": "⠼",
    "$": "⠫",
    "%": "⠩",
    "&": "⠯",
    "": "⠄",
    "(": "⠷",
    ")": "⠾",
    "*": "⠡",
    "+": "⠬",
    ",": "⠠",
    "-": "⠤",
    ".": "⠨",
    "/": "⠌",
    "0": "⠴",
    "1": "⠂",
    "2": "⠆",
    "3": "⠒",
    "4": "⠲",
    "5": "⠢",
    "6": "⠖",
    "7": "⠶",
    "8": "⠦",
    "9": "⠔",
    ":": "⠱",
    ";": "⠰",
    "<": "⠣",
    "=": "⠿",
    ">": "⠜",
    "?": "⠹",
    "@": "⠈",
    "a": "⠁",
    "b": "⠃",
    "c": "⠉",
    "d": "⠙",
    "e": "⠑",
    "f": "⠋",
    "g": "⠛",
    "h": "⠓",
    "i": "⠊",
    "j": "⠚",
    "k": "⠅",
    "l": "⠇",
    "m": "⠍",
    "n": "⠝",
    "o": "⠕",
    "p": "⠏",
    "q": "⠟",
    "r": "⠗",
    "s": "⠎",
    "t": "⠞",
    "u": "⠥",
    "v": "⠧",
    "w": "⠺",
    "x": "⠭",
    "y": "⠽",
    "z": "⠵",
    "[": "⠪",
    "\\": "⠳",
    "]": "⠻",
    "^": "⠘",
    "_": "⠸",
}


text = {v: k for k, v in braille.items()}


def braille_to_text(incoming: str):
    for i in incoming:
        if i not in text.keys():
            raise Exception(f"{i} is not a translatable braille character")
    return "".join([text[l] for l in incoming])


def text_to_braille(incoming: str):
    return "".join([braille[l] for l in incoming])
