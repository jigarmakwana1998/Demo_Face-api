import numpy as np
import matplotlib.pyplot as plt

with open('output_0.txt') as f:
  kernels = np.fromfile(f,sep=',').reshape((512,32,32))

def save_input():
  with open('input_0.txt') as f:
    input_image = np.fromfile(f,sep=',').reshape((512,512,3))
  grayScale = np.zeros([512, 512, 3])
  print(np.min(input_image), np.max(input_image))

  input_image = (input_image - np.min(input_image))/(np.max(input_image)-np.min(input_image))

  grayScale[:,:,0] = (input_image[:,:,1]+input_image[:,:,0]+input_image[:,:,2])/3
  grayScale[:,:,1] = (input_image[:,:,1]+input_image[:,:,0]+input_image[:,:,2])/3
  grayScale[:,:,2] = (input_image[:,:,1]+input_image[:,:,0]+input_image[:,:,2])/3
  plt.imsave('input.png', grayScale)

def show_kernels():
  for i in range(kernels.shape[0]-2):
    im = 1 - (kernels[i:i+3, :, :] / 255)
    im = im.transpose((1,2,0))
    plt.clf()
    plt.imshow(im)
    plt.title('Kernels %d - %d' % (i,i+2))
    plt.pause(1)

def show_kernel(r=-1, g=-1, b=-1):
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
  plt.imsave('conv_11/'+str(r)+'.png', im/255)

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
    fig.subplots_adjust(hspace=0.4)
    plt.title(25*r+(i-1), fontsize=5)
    plt.axis('off') 
    # for white plots
    # plt.imshow(1-(im/255))
    # for black plots
    # plt.imshow(im/255)

  # for white plots
  plt.savefig('White/Kernels from '+str(25*r)+' to '+str(25*(r+1) - 1)+'.png')
  # for black plots
  # plt.savefig('Black/Kernels from '+str(25*r)+' to '+str(25*(r+1) - 1)+'.png')


save_input()
for i in [85,90,333,463]:
  a = kernels[i,:,:]
  np.savetxt(str(i)+'.txt', a, fmt="%f") 

