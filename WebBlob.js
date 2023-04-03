class WebBlob extends Blob {
	static async create(url, opts = { cacheBelow: 1 }) {
		const response = await fetch(url, { method: "HEAD" });

		const size = Number(response.headers.get("content-length"));
		const contentType = response.headers.get("content-type") || "";
		const supportRange = response.headers.get("accept-ranges") === "bytes";

		// if (!supportRange || size < opts.cacheBelow) {
		// 	console.log('fetch with Blob')
		// 	return await (await fetch(url)).blob();
		// }

		return new WebBlob(url, 0, size, contentType, true);
	}


	constructor(url, start, end, contentType, full) {
		super([]);

		this.url = url;
		this.start = start;
		this.end = end;
		this.contentType = contentType;
		this.full = full;
	}

	get size() {
		return this.end - this.start;
	}

	get type() {
		return this.contentType;
	}

	slice(start = 0, end = this.size) {
		if (start < 0 || end < 0) {
			new TypeError("Unsupported negative start/end on FileBlob.slice");
		}

		const slice = new WebBlob(
			this.url,
			this.start + start,
			Math.min(this.start + end, this.end),
			this.contentType,
			start === 0 && end === this.size ? this.full : false
		);

		return slice;
	}

	async arrayBuffer() {
		const result = await this.fetchRange();

		return result.arrayBuffer();
	}

	async text() {
		const result = await this.fetchRange();

		return result.text();
	}

	stream() {
		const stream = new TransformStream();

		this.fetchRange()
			.then((response) => response.body?.pipeThrough(stream))
			.catch((error) => stream.writable.abort(error.message));

		return stream.readable;
	}

	fetchRange() {
		if (this.full) {
			return fetch(this.url);
		}

		return fetch(this.url, {
			headers: {
				Range: `bytes=${this.start}-${this.end - 1}`,
			},
		});
	}
}
