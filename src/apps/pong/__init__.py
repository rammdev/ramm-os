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

while True:
    WN.update()
