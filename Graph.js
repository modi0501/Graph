
let graph = {
	A: { B: 5,D: 5 ,E:7},
	B: { C:4 },
	C: { D: 8,E:2},
	D: {C:8,E:6},
    E:{B:3},
};

console.log(graph);



const shortestDistanceNode = (distances, visited) => {
	let shortest = null;

	for (let node in distances) {
		let currentIsShortest =
			shortest === null || distances[node] < distances[shortest];
		if (currentIsShortest && !visited.includes(node)) {
			shortest = node;
		}
	}
	return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
	// establish object for recording distances from the start node
	let distances = {};
	distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
    console.log(distances);

	// track paths
    // let parents = { endNode: null };
    let parents = {};
	for (let child in graph[startNode]) {
		parents[child] = startNode;
    }
    console.log(parents);

	// track nodes that have already been visited
	let visited = [];

	// find the nearest node
    let node = shortestDistanceNode(distances, visited);
    console.log(node);

	// for that node
	while (node) {
		// find its distance from the start node & its child nodes
        let distance = distances[node];
        console.log(distance);
		let children = graph[node];
		// for each of those child nodes
		for (let child in children) {
			// make sure each child node is not the start node
			if (String(child) === String(startNode)) {
				continue;
			} else {
				// save the distance from the start node to the child node
				let newdistance = distance + children[child];
				// if there's no recorded distance from the start node to the child node in the distances object
				// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
				// save the distance to the object
                // record the path
                console.log("kkk "+ newdistance);
				if (!distances[child] || distances[child] > newdistance) {
					distances[child] = newdistance;
					parents[child] = node;
				}
			}
		}
		// move the node to the visited set
		visited.push(node);
        // move to the nearest neighbor node
        console.log(distances);
        node = shortestDistanceNode(distances, visited);
        console.log(node);
	}

	// using the stored paths from start node to end node
	// record the shortest path
    let shortestPath = [endNode];
    console.log(parents);
    let parent = parents[endNode];
    console.log(parent);
	while (parent) {
		shortestPath.push(parent);
		parent = parents[parent];
	}
	shortestPath.reverse();

	// return the shortest path from start node to end node & its distance
	let results = {
		distance: distances[endNode],
		path: shortestPath,
	};

	return results;
};

let r=findShortestPath(graph,'E','C');
console.log(r);