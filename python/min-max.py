import numpy as np

with open('output (4).txt') as f:
  kernels = np.fromfile(f,sep=',').reshape((128,14,14))

list1 = []
max1 = []
min1 = []
for i in range(128):
  maxi = np.max(kernels[i,:,:])
  mini = np.min(kernels[i,:,:])
  list1.append([maxi, mini])
  print(i, mini, maxi)
  max1.append(maxi)
  min1.append(mini)
# print(max1)
# print(min1)
print(np.max(max1))
print(np.min(max1))
print(np.max(min1))
print(np.min(min1))