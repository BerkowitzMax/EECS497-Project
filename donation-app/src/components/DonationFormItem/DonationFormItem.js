import Compressor from "compressorjs";

export default {
	name: "DonationFormItem",
	components: {},
	props: {
		formData: Object,
	},
	data() {
		return {
			picture_name: "Upload Photo"
		};
	},
	computed: {},
	mounted() {},
	watch: {},
	methods: {
		removeItem() {
			this.$emit("remove-item", this.formData.itemId);
		},
		saveImage(event) {
            if (!event.target.files[0]) {
                this.formData.picture = null;
                return;
            }

            let picture = event.target.files[0];
            this.picture_name = picture.name;

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.formData.picture = reader.result;
            });

            new Compressor(picture, {
                quality: 1,
                maxHeight: 160,
                maxWidth: 160,
                success(compressed) {
                    reader.readAsDataURL(compressed);
                },
                error(err) {
                    console.error(err.message);
                },
            });
        }
	},
};
