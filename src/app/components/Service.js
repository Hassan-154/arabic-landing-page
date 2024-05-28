import React from 'react'
import Image from "next/image";
import backGround from '@/app/assets/images/Ellipse 5.png'

function service() {
    return (
        <main className="relative">
            <Image className="ml-[250px]" width='full' height='full' src={backGround} alt="Background image of كال القيمة company" />
            <div className="absolute top-0 left-0 right-0 flex justify-center pt-8">
                <article className="flex flex-col gap-4 max-w-[900px] mx-auto text-[20px] sm:text-[24px] text-right font-medium px-3">
                    <h1 className="text-brown text-[28px] sm:text-[38px]">العملاء<br className='block sm:hidden'></br> المستهدفو</h1>
                    <p>
                        العملاء المستهدفون في شركة التقييم العقاري تشكل مجموعة متنوعة من الأفراد والمسؤسسات التي تبحث عن خدمات دقيقة وموثوقة لتحديد القيمة السوقية للعقارات هذه الخدمات ضرورية لعدة اسباب مختلفة بما في ذلك
                    </p>
                    <p>
                        البيع والشراء التمويل العقاري القييم لاغراض التأمين والتقييمات الضريبية إليك نظرة على العملاء المستهدفين الرئيسيين
                    </p>
                    <ul className='text-lightBrown mt-5'>
                        <li>الأفراد: يحتاج الأفراد إلى تقييمات عقارية عند شراء أو بيع منزل، للحصول عىل قرض عقاري، أو لأغراض تخطيط الضرائب و الإرث</li>
                        <li>المستثمرون: المستثمرون في العقارات، سواء كانوا أفراًدا أو شركات، يحتاجون إىل تقييمات دقيقة لتحديد القيمة الحقيقية للإستثمارات العقارية وتحليل العائد المحتمل على الإستثمار</li>
                        <li>البنوك والمؤسسات المالية: تحتاج هذه المؤسسات إىل تقييمات عقارية لتحديد قيمة العقارات المعروضة كضمانات للقروض، بما في ذلك الرهون العقارية</li>
                        <li>شركات التأمين: تستخدم شركات التأمين التقييمات العقارية لتحديد مبلغ التغطية الالزم لعقار معين ولتقييم المخاطر</li>
                        <li>المطورون العقاريون: يعتمد المطورون عىل التقييمات العقارية لتقدير قيمة الأراضي والمشاريع الجديدة، مما يساعدهم في اتخاذ قرارات مستنيرة بشأن التطوير و الإستثمار</li>
                        <li>الهيئات الحكومية والمحلية: تستخدم لتقييم العقارات لأغراض ضريبية، تخطيط استخدام الأراضي، وفي بعض الحالات، لتحديد التعويضات في حالة الإستماك</li>
                    </ul>
                </article>
            </div>
        </main>
    )
}

export default service