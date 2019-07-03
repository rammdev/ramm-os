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

BALL = turtle.Turtle()
BALL.speed(-1)
BALL.shape("square")
BALL.color("white")
BALL.penup()
BALL.goto(0, 0)
BALL.dx = 2
BALL.dy = -2

PEN = turtle.Turtle()


def paddle_a_up():
    """Left paddle up."""
    coords_y = PADDLE_A.ycor()
    coords_y += 20
    PADDLE_A.sety(coords_y)


def paddle_a_down():
    """Left paddle down."""
    coords_y = PADDLE_A.ycor()
    coords_y -= 20
    PADDLE_A.sety(coords_y)


def paddle_b_up():
    """Right paddle up."""
    c_y = PADDLE_B.ycor()
    c_y += 20
    PADDLE_B.sety(c_y)


def paddle_b_down():
    """Right paddle down."""
    coords_y = PADDLE_B.ycor()
    coords_y -= 20
    PADDLE_B.sety(coords_y)


WN.listen()
WN.onkeypress(paddle_a_up, "w")
WN.onkeypress(paddle_a_down, "s")
WN.onkeypress(paddle_b_up, "Up")
WN.onkeypress(paddle_b_down, "Down")

while True:
    WN.update()

    BALL.setx(BALL.xcor() + BALL.dx)
    BALL.sety(BALL.ycor() + BALL.dy)

    if BALL.ycor() > 290:
        BALL.sety(290)
        BALL.dy *= -1

    if BALL.ycor() < -290:
        BALL.sety(-290)
        BALL.dy *= -1

    if BALL.xcor() > 390:
        BALL.goto(0, 0)
        BALL.dx *= -1

    if BALL.xcor() < -390:
        BALL.goto(0, 0)
        BALL.dx *= -1

    if BALL.xcor() > 340 and BALL.xcor() < 350 and BALL.ycor() \
            < PADDLE_B.ycor() + 40 and BALL.ycor() > PADDLE_B.ycor() - 40:
        BALL.setx(340)
        BALL.dx *= -1

    if BALL.xcor() < -340 and BALL.xcor() > -350 and BALL.ycor() \
            < PADDLE_A.ycor() + 40 and BALL.ycor() > PADDLE_A.ycor() - 40:
        BALL.setx(-340)
        BALL.dx *= -1
