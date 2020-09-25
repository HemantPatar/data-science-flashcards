import random
from fastapi import FastAPI


app = FastAPI()

with open("theory.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

quiz = {}
for i in range(len(lines)):

    # For every line, if it starts with a **,
    # this starts the beginning of a question-answer pair
    if lines[i].startswith("**"):

        # Get the question
        qn = lines[i]

        # The answer is everything in the next few lines
        # up till a line which starts with a **
        i += 1
        start = i
        ans_lines = []
        while i < len(lines) and not lines[i].startswith("**"):
            ans_lines.append(i)
            i += 1
        end = i

        # Concat final answer
        ans = "".join(lines[start:end])

        # Store in dictionary
        quiz[qn] = ans

qns = list(quiz.keys())


@app.get("/")
def index():
    qn = random.choice(qns)
    return {"question": qn, "ans": quiz[qn]}
