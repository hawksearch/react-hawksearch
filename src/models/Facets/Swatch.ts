export class Swatch {
	/** Match this value to the @see Value object in the @see Values array of @see Facet. */
	public Value: string;

	/** Name of the asset. */
	public AssetName: string;
	/** URL of the asset. */
	public AssetUrl: string;

	/** Indicates if value is the default. */
	public IsDefault: boolean;

	/** Color of the asset. */
	public Color: string;

	public constructor(init: Swatch) {
		Object.assign(this, init);
	}
}
