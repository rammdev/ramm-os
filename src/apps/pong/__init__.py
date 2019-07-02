"""Pong game."""
import turtle

WN = turtle.Screen()
WN.title("Megapong")
WN.bgcolor("black")
WN.setup(width=800, height=600)
WN.tracer(0)

PADDLE_A = turtle.Turtle()
PADDLE_A.speed(0)
PADDLE_A.shape("square")
PADDLE_A.color("white")
PADDLE_A.shapesize(stretch_wid=5, stretch_len=1)
PADDLE_A.penup()
PADDLE_A.goto(-350, 0)

PADDLE_B = turtle.Turtle()
PADDLE_B.speed(0)
PADDLE_B.shape("square")
PADDLE_B.color("white")
PADDLE_B.shapesize(stretch_wid=5, stretch_len=1)
PADDLE_B.penup()
PADDLE_B.goto(350, 0)

ball = turtle.Turtle()
ball.speed(0)
ball.shape("square")
ball.color("white")
ball.penup()
ball.goto(0, 0)

def PADDLE_A_up: turtle
    y = PADDLE_A.ycor()
    y += 20
    PADDLE_A.sety(y)
    
    
def PADDLE_A_down: turtle
    y = PADDLE_A.ycor()
    y -= 20
    PADDLE_A.sety(y)


def PADDLE_B_up: turtle
    y = PADDLE_B.ycor()
    y += 20
    PADDLE_B.sety(y)

    
def PADDLE_B_down: turtle
    y = PADDLE_B.ycor()
    y -= 20
    PADDLE_B.sety(y)


wn.listen()
wn.onkeypress(PADDLE_A_up, "w")
wn.onkeypress(PADDLE_A_down, "s")
wn.onkeypress(PADDLE_B_up, "Up")
wn.onkeypress(PADDLE_B_down, "Down")

while True:
    WN.update()
