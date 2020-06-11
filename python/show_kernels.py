import numpy as np
import matplotlib.pyplot as plt

with open('conv11_512_32_32.txt') as f:
  kernels = np.fromfile(f,sep=',').reshape((512,32,32))*(255.0/6)

def show_kernels():
  for i in range(kernels.shape[0]-2):
    im = 1 - (kernels[i:i+3, :, :] / 255)
    im = im.transpose((1,2,0))
    plt.clf()
    plt.imshow(im)
    plt.title('Kernels %d - %d' % (i,i+2))
    plt.pause(1)

def show_kernel(r=-1):
  plt.ion()
  im = np.zeros([*kernels.shape[1:], 3])
  if r >= 0:
    im[:,:,0] = kernels[r,:,:]
  if g >= 0:
    im[:,:,1] = kernels[r,:,:]
  if b >= 0:
    im[:,:,2] = kernels[r,:,:]
  plt.clf()
  # plt.imshow(im/255)
  plt.title('Kernels %s' % (r))
  # plt.pause(1)
  plt.imsave('conv_11/'+str(r)+'.png', 1 - (im/255))

def show_kernels_25(r=-1):
  plt.ion()
  fig=plt.figure()
  for i in range(1,26):
    im = np.zeros([*kernels.shape[1:], 3])
    if r >= 0 and 25*r + i <= 512:
      im[:,:,0] = kernels[25*r+(i-1),:,:]
      im[:,:,1] = kernels[25*r+(i-1),:,:]
      im[:,:,2] = kernels[25*r+(i-1),:,:]
    fig.add_subplot(5, 5, i)
    # for white plots
    # plt.imshow(1-(im/255))
    # for black plots
    plt.imshow(im/255)

  # for white plots
  # plt.savefig('conv_11/Kernels from '+str(25*r)+' to '+str(25*(r+1) - 1)+'(white).png')
  # for black plots
  plt.savefig('conv_11/Kernels from '+str(25*r)+' to '+str(25*(r+1) - 1)+'.png')

for i in range(21):
  show_kernels_25(i)

