import React from 'react';
import Image from "next/image";
import backGround from '@/app/assets/images/Ellipse 1.png'

function About() {
  return (
    <main className="relative">
      <Image className="h-[100vh]" width='full' height='full' src={backGround} alt="Background image of كال القيمة company" />
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-8">
        <article className="flex flex-col gap-4 max-w-[900px] mx-auto text-[23px] sm:text-[30px] text-right font-medium px-3">
          <h1 className="text-brown text-[28px] sm:text-[38px]">عن شركة  <br className='block sm:hidden'></br>كال القيمة</h1>
          <p>
            شركة كال القيمة للتقييم العقاري شركة سعودية , مرخصة من الهيئة
            السعودية للمقيمين المعتمدين "تقييم" بموجب الترخيص المهني رقم :
            1210001458 يتألف فريق التقييم من خبراء في مجال التقييم العقاري وعلى إطلاع بما يحدث في السوق العقاري , يستند هذا الفريق ويؤدي عمله بدقة بالإعتماد على معايـير التقيـيم الدولية
          </p>
          <p>(International Valuation Standards ) IVS </p>
          <p>ونلتزم بدستور أخلاقيات المهنة (Code Of Ethics ) التابع لمعهد التثمين الأمريكي</p>
          <p>Appraisal Institue-AI</p>
        </article>
      </div>
    </main>
  )
}

export default About;