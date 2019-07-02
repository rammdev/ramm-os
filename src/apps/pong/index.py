import turtle

wn = turtle.Screen()
wn.title("Megapong")
wn.bgcolour("black")
wn.setup(width=800, height=600)
wn.tracer(0)

paddle_a = turtle.turtle()
paddle_a.speed(0)
paddle_a.shape("square")
paddle_a.colour("white")

while True:
  wn.update()
  
