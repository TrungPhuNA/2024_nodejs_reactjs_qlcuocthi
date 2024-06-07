import React, { useEffect, useState } from "react";
import './style.css'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { setField } from "../../services/helpers.service";

const CkeditorPage = (props: any) => {
	return (
		<>
			{props.title && <label className="mb-2.5 block text-black dark:text-white">
				{props.title || 'Nội dung'}
			</label>}

			<div className="relative z-20 bg-white dark:bg-form-input">
				<CKEditor
					editor={ClassicEditor}
					data={props.value}
					onChange={(e, editor) => {
						props.onChange(editor?.getData())
					}}
				/>
			</div>
		</>
	);
};

export default CkeditorPage;
