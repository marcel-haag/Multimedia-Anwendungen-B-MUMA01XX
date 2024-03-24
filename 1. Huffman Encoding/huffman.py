import sys


class Node(object):
    def __init__(self, left=None, right=None):
        self.left = left
        self.right = right

    def children(self):
        return self.left, self.right

    def __str__(self):
        return self.left, self.right


# Exercise 1. e)
def create_histogram(string):
    counter = {}
    for char in string:
        if char in counter:
            counter[char] += 1
        else:
            counter[char] = 1

    histogram = dict(counter)
    return histogram


# Exercise 1. f)
def create_code_tree(histogram_nodes):
    while len(histogram_nodes) > 1:
        # Get the two nodes with the smallest frequency from histogram
        nodeOne, frequencyOne = histogram_nodes.pop()
        nodeTwo, frequencyTwo = histogram_nodes.pop()
        # Create new node with children
        combined_node = Node(nodeOne, nodeTwo)
        combined_freq = frequencyOne + frequencyTwo
        # Append new node
        histogram_nodes.append((combined_node, combined_freq))
        histogram_nodes = sorted(histogram_nodes, reverse=True, key=lambda x: x[1]) # lambda to base sorting on the second element
    # Return root of tree
    return histogram_nodes[0][0]


# Exercise 1. g)
def find_huffman_code(node, binaryCode=""):
    if type(node) is str:
        return {node: binaryCode}
    (left, right) = node.children()
    code = dict()
    code.update(find_huffman_code(left, binaryCode + "0"))
    code.update(find_huffman_code(right, binaryCode + "1"))
    return code


# python3 huffman.py "Das ist ein kurzer Satz"
if __name__ == '__main__':
    string = ''

    if len(sys.argv) == 2:
        string = sys.argv[1]
        print("Input:", string + "\n")

        # Exercise 1. e)
        histogram = create_histogram(string)
        print("Exercise 1. e) Histogram: \n" + str(histogram) + "\n")

        histogram = sorted(histogram.items(), reverse=True, key=lambda x: x[1]) # lambda to base sorting on the second element
        # Exercise 1. f)
        rootNode = create_code_tree(histogram)

        # Exercise 1. g)
        encoding = find_huffman_code(rootNode)
        print("Exercise 1. g) Huffmancode: ")
        for i in encoding:
            print(f"{i} is {encoding[i]}")

    else:
        print("Missing input!")
        print("Try again with a word or sentence.")
