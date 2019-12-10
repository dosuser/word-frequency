<h1>text-word-frequency</h1>

<tr />
word frequency command line utility.

useful util for memorizing the document's keywords.

you can get a sample well-known-word dictionary in this project github. 

<h3>Usage</h3>

```text
> npm i text-word-frequency -g
> word-frequency -i sample/kafka.txt -d sample/dic.txt
 or
> lynx --dump "https://kafka.apache.org/documentation" 
  | word-frequency -d sample/dic.txt

kafka	1187
broker	581
consumer	554
sasl	368
ssl	337
producer	319
metrics	299
brokers	286
streams	283
partition	256
protocol	214
connector	208
zookeeper	192
offset	184
clients	177
records	177
topics	163
security	153
partitions	153
replicas	152
null	141
replication	123
...
```


<h3>dictionary format</h3>
we accept just first word, so tsv(tab separated value), space is allowed.

```text
word (whitespace+?) anyting...
```

example

```text
one 
two i hate this number
three
four
five
six
```


<h3>Help</h3>

```text
> word-frequency --help

Usage: main [options]

count word frequency in stdin or file

Options:
  -d, --dictionary <dic>       dictionary file to exclude from the result (line 
                               separated, single word)
  -i, --inputFile <inputFile>  input text file, 
  -h, --help                   output usage information
```
