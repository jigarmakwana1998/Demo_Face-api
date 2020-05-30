import numpy as np
import matplotlib.pyplot as plt

with open('output.txt') as f:
  kernels = np.fromfile(f,sep=',').reshape((256,256,64))

def show_kernels():
  for i in range(kernels.shape[-1]-2):
    im = kernels[:, :, i:i+3] / 255
    plt.clf()
    plt.imshow(im)
    plt.title('Kernels %d - %d' % (i,i+2))
    plt.pause(1)

def show_kernel(r=-1, g=-1, b=-1):
  plt.ion()
  im = np.zeros([*kernels.shape[0:2], 3])
  if r >= 0:
    im[:,:,0] = kernels[:,:,r]
  if g >= 0:
    im[:,:,1] = kernels[:,:,g]
  if b >= 0:
    im[:,:,2] = kernels[:,:,b]
  plt.clf()
  plt.imshow(im/255)
  plt.title('Kernels %s %s %s' % (r,g,b))
  plt.pause(1)

show_kernel(16,18,19)
