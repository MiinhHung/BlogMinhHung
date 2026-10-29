"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { ArrowRight, Clock, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PostBody = {
  title: string;
  category: string;
  date: string;
  readTime: string;
  desc: string;
  content: React.ReactNode;
};

type BlogPost = {
  id: number;
  img: string;
  EN: PostBody;
  VI: PostBody;
};

/** How many cards are shown before the "view all" control appears. */
const VISIBLE_COUNT = 6;

const posts: BlogPost[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    EN: {
      title: "Attribution, demystified",
      category: "Marketing",
      date: "Jun 11, 2026",
      readTime: "5 min read",
      desc: "How to credit revenue to the right flow, campaign, and channel — without the marketing-mix headache.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Proper attribution is the holy grail of modern digital marketing. When you&apos;re running email flows, SMS campaigns, and paid social ads simultaneously, understanding exactly which touchpoint drove the sale is critical to scaling your efforts efficiently.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">The Multi-Touch Dilemma</h3>
          <p>Most default attribution models (like last-click) dramatically over-report on bottom-of-funnel channels while ignoring the crucial top-of-funnel touchpoints that introduced the customer to your brand in the first place. This leads to misallocated budgets and stunted growth.</p>
          <p>At SID CORP, we implement robust tracking architectures that properly weight interactions across the entire customer journey, giving you a clear, actionable view of your true return on ad spend (ROAS).</p>
        </div>
      ),
    },
    VI: {
      title: "Giải mã bài toán Phân bổ (Attribution)",
      category: "Tiếp thị",
      date: "11 Tháng 6, 2026",
      readTime: "5 phút đọc",
      desc: "Cách ghi nhận doanh thu chính xác cho luồng, chiến dịch và kênh — loại bỏ cơn đau đầu về tổ hợp tiếp thị.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Phân bổ (Attribution) chính xác là mục tiêu tối thượng của tiếp thị kỹ thuật số hiện đại. Khi bạn chạy đồng thời các luồng email, chiến dịch SMS và quảng cáo trả phí, việc hiểu chính xác điểm chạm nào mang lại doanh thu là rất quan trọng để mở rộng quy mô hiệu quả.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Vấn đề Đa điểm chạm (Multi-Touch)</h3>
          <p>Hầu hết các mô hình phân bổ mặc định (như last-click) đều báo cáo phóng đại về các kênh ở cuối phễu trong khi bỏ qua các điểm chạm quan trọng ở đầu phễu - nơi khách hàng lần đầu biết đến thương hiệu của bạn. Điều này dẫn đến việc phân bổ ngân sách sai lệch và kìm hãm sự tăng trưởng.</p>
          <p>Tại SID CORP, chúng tôi triển khai các kiến trúc theo dõi mạnh mẽ để đánh giá đúng mức độ quan trọng của các tương tác trong toàn bộ hành trình khách hàng, mang lại cho bạn cái nhìn rõ ràng và có thể hành động về tỷ suất hoàn vốn quảng cáo (ROAS) thực tế.</p>
        </div>
      ),
    },
  },
  {
    id: 2,
    img: "https://www.sidcorp.co/storage/store-58/blog/1781213734486636682-pexels-photo-7013900.jpg",
    EN: {
      title: "Building a win-back that actually works",
      category: "Retention",
      date: "Jun 11, 2026",
      readTime: "7 min read",
      desc: "A playbook on the win-back flow that brings back lapsed customers and drives massive revenue.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>It costs significantly more to acquire a new customer than to retain an existing one. Yet, many businesses neglect their lapsed customer segments, sending generic &quot;we miss you&quot; emails that end up in the spam folder.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">The Anatomy of a Successful Win-Back</h3>
          <p>A high-converting win-back sequence isn&apos;t just about offering a discount. It&apos;s about timing, segmentation, and personalized messaging based on the customer&apos;s previous purchase history.</p>
          <p>By analyzing purchasing cycles and implementing dynamic content triggers, we&apos;ve helped clients recover significant amounts of &quot;lost&quot; revenue through automated win-back flows.</p>
        </div>
      ),
    },
    VI: {
      title: "Xây dựng chiến dịch Win-back hiệu quả",
      category: "Duy trì",
      date: "11 Tháng 6, 2026",
      readTime: "7 phút đọc",
      desc: "Cẩm nang về luồng win-back giúp thu hút lại khách hàng cũ và mang về doanh thu khổng lồ.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Chi phí để có được một khách hàng mới cao hơn rất nhiều so với việc duy trì một khách hàng hiện tại. Tuy nhiên, nhiều doanh nghiệp lại bỏ qua tập khách hàng đã không còn hoạt động, chỉ gửi những email chung chung kiểu &quot;chúng tôi nhớ bạn&quot; và cuối cùng rơi vào hộp thư rác.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Cấu trúc của một chiến dịch Win-Back thành công</h3>
          <p>Một chuỗi win-back có tỷ lệ chuyển đổi cao không chỉ là cung cấp mã giảm giá. Đó là về thời điểm, phân khúc và thông điệp được cá nhân hóa dựa trên lịch sử mua hàng trước đó của khách hàng.</p>
          <p>Bằng cách phân tích chu kỳ mua hàng và triển khai các trigger nội dung động, chúng tôi đã giúp khách hàng thu hồi một phần đáng kể doanh thu &quot;bị mất&quot; thông qua các luồng win-back tự động.</p>
        </div>
      ),
    },
  },
  {
    id: 3,
    img: "https://www.sidcorp.co/storage/store-58/blog/1781213735691945772-pexels-photo-20724349.jpg",
    EN: {
      title: "Segmentation that doubles open rates",
      category: "Strategy",
      date: "Jun 11, 2026",
      readTime: "4 min read",
      desc: "Stop blasting one list. The four segments that consistently double open rates and engagement.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Batch-and-blast email marketing is dead. Sending the exact same message to your entire subscriber list guarantees low open rates, high unsubscribe rates, and damaged deliverability scores over time.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">The Big Four Segments</h3>
          <p>To double your open rates, you need to focus on four core segments: Recent Purchasers, High-Intent Window Shoppers, VIPs (High LTV), and At-Risk Subscribers.</p>
          <p>Tailoring your messaging, offer strategy, and send frequency to these specific cohorts ensures that your audience receives relevant content, drastically improving both engagement metrics and overall conversion rates.</p>
        </div>
      ),
    },
    VI: {
      title: "Phân khúc khách hàng giúp nhân đôi tỷ lệ mở email",
      category: "Chiến lược",
      date: "11 Tháng 6, 2026",
      readTime: "4 phút đọc",
      desc: "Ngừng gửi email hàng loạt. Bốn phân khúc khách hàng giúp liên tục nhân đôi tỷ lệ mở và tương tác.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Tiếp thị email kiểu &quot;gửi hàng loạt&quot; (batch-and-blast) đã lỗi thời. Việc gửi cùng một thông điệp cho toàn bộ danh sách người đăng ký sẽ dẫn đến tỷ lệ mở thấp, tỷ lệ hủy đăng ký cao và làm hỏng điểm uy tín gửi email (deliverability) theo thời gian.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Bốn Phân khúc Trọng yếu</h3>
          <p>Để nhân đôi tỷ lệ mở email, bạn cần tập trung vào bốn phân khúc cốt lõi: Người mua gần đây, Người xem có ý định mua cao, Khách hàng VIP (LTV cao), và Khách hàng có nguy cơ rời bỏ.</p>
          <p>Việc điều chỉnh thông điệp, chiến lược ưu đãi và tần suất gửi cho các nhóm cụ thể này đảm bảo rằng khán giả của bạn nhận được nội dung có liên quan, từ đó cải thiện đáng kể cả số liệu tương tác và tỷ lệ chuyển đổi tổng thể.</p>
        </div>
      ),
    },
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    EN: {
      title: "ERP: build it or buy it?",
      category: "Architecture",
      date: "Aug 12, 2026",
      readTime: "8 min read",
      desc: "The question every growing company reaches. A framework for deciding, before the licence renewal forces your hand.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Most teams frame this as a cost comparison. That is the wrong axis. A packaged ERP is cheaper on day one and more expensive every day that your process differs from the vendor&apos;s assumptions. A custom build is the reverse.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Ask where your advantage lives</h3>
          <p>Buy the parts of your business that look like everyone else&apos;s: general ledger, payroll, standard procurement. There is no competitive edge in a bespoke invoice table, and you will spend years maintaining one.</p>
          <p>Build only where your process is the product — the pricing logic, the scheduling rules, the thing your customers actually pay you for. In practice most companies land on a bought core with two or three custom modules around it, connected by a clean integration layer.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">The exit cost nobody prices in</h3>
          <p>Before signing, ask how you would leave. Can you export your own data in a usable shape? Are the integration points documented? A vendor who cannot answer these is quoting you a lower number than you will actually pay.</p>
        </div>
      ),
    },
    VI: {
      title: "ERP: nên tự xây hay mua sẵn?",
      category: "Kiến trúc",
      date: "12 Tháng 8, 2026",
      readTime: "8 phút đọc",
      desc: "Câu hỏi mà mọi doanh nghiệp đang tăng trưởng đều gặp. Một khung tư duy để quyết định, trước khi kỳ gia hạn license ép bạn phải chọn.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Phần lớn các đội nhóm đặt bài toán này thành so sánh chi phí. Đó là trục sai. Một ERP đóng gói rẻ hơn trong ngày đầu tiên, và đắt thêm mỗi ngày mà quy trình của bạn lệch khỏi giả định của nhà cung cấp. Tự xây thì ngược lại.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Hãy hỏi lợi thế của bạn nằm ở đâu</h3>
          <p>Hãy mua những phần giống hệt mọi doanh nghiệp khác: sổ cái, tính lương, mua sắm tiêu chuẩn. Không có lợi thế cạnh tranh nào nằm trong một bảng hóa đơn tự viết, mà bạn sẽ mất nhiều năm để bảo trì nó.</p>
          <p>Chỉ tự xây ở nơi quy trình chính là sản phẩm — logic định giá, quy tắc điều phối, thứ mà khách hàng thực sự trả tiền cho bạn. Trên thực tế, hầu hết doanh nghiệp dừng lại ở một lõi mua sẵn cộng hai ba module tự xây xung quanh, nối với nhau bằng một lớp tích hợp sạch sẽ.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Chi phí rời đi mà không ai tính</h3>
          <p>Trước khi ký, hãy hỏi bạn sẽ rời hệ thống bằng cách nào. Có xuất được dữ liệu của chính mình ra định dạng dùng được không? Các điểm tích hợp có tài liệu không? Nhà cung cấp không trả lời được những câu này đang báo cho bạn một con số thấp hơn số bạn thực trả.</p>
        </div>
      ),
    },
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    EN: {
      title: "Putting AI to work without burning the budget",
      category: "AI Solutions",
      date: "Jul 28, 2026",
      readTime: "6 min read",
      desc: "Where language models genuinely pay for themselves inside a business process — and where they quietly do not.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>The pattern that fails is starting from the technology: a team buys API credits, then goes looking for something to point them at. The pattern that works starts from a task that is already expensive, already repetitive, and already tolerant of a human check at the end.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Three properties of a good first candidate</h3>
          <p>It is high volume, so the saving compounds. It has a reviewable output, so a mistake is caught rather than shipped. And it has a measurable baseline — you know what it costs today in hours, so you can prove whether the change helped.</p>
          <p>Document intake, first-draft classification, and internal search over your own knowledge base tend to fit all three. Anything where a wrong answer reaches a customer unreviewed tends to fit none of them.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Budget for evaluation, not just inference</h3>
          <p>Teams price the model calls and forget the harness around them: a test set, a way to compare two prompt versions, someone who owns the quality bar. Without that you cannot tell a good week from a bad one, and the project stalls the first time output quality is questioned.</p>
        </div>
      ),
    },
    VI: {
      title: "Đưa AI vào việc mà không đốt ngân sách",
      category: "Giải pháp AI",
      date: "28 Tháng 7, 2026",
      readTime: "6 phút đọc",
      desc: "Nơi mô hình ngôn ngữ thực sự hoàn vốn bên trong một quy trình doanh nghiệp — và nơi nó lặng lẽ không làm được điều đó.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Kiểu làm thất bại là bắt đầu từ công nghệ: đội nhóm mua credit API rồi mới đi tìm chỗ để dùng. Kiểu làm hiệu quả bắt đầu từ một công việc vốn đã tốn kém, vốn đã lặp đi lặp lại, và vốn đã chấp nhận được một bước con người kiểm tra ở cuối.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Ba đặc điểm của một ứng viên đầu tiên tốt</h3>
          <p>Khối lượng lớn, để phần tiết kiệm cộng dồn lại. Đầu ra kiểm tra được, để lỗi bị chặn chứ không lọt ra ngoài. Và có một mốc đo được — bạn biết hôm nay nó tốn bao nhiêu giờ, nên bạn chứng minh được thay đổi có giúp ích hay không.</p>
          <p>Tiếp nhận và bóc tách chứng từ, phân loại bản nháp đầu tiên, và tìm kiếm nội bộ trên chính kho tri thức của bạn thường thỏa cả ba. Còn bất cứ việc gì mà một câu trả lời sai đến thẳng tay khách hàng không qua kiểm duyệt thì thường không thỏa điều nào.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Hãy dự trù ngân sách cho khâu đánh giá, không chỉ cho lượt gọi mô hình</h3>
          <p>Các đội thường tính tiền gọi mô hình rồi quên mất bộ khung quanh nó: một tập kiểm thử, một cách so sánh hai phiên bản prompt, và một người chịu trách nhiệm về ngưỡng chất lượng. Thiếu những thứ đó, bạn không phân biệt được tuần tốt với tuần tệ, và dự án sẽ khựng lại ngay lần đầu tiên chất lượng đầu ra bị chất vấn.</p>
        </div>
      ),
    },
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    EN: {
      title: "Migrating CRM data without losing history",
      category: "Data",
      date: "Jul 9, 2026",
      readTime: "7 min read",
      desc: "The migration itself is the easy part. Keeping the relationships, the timestamps, and the trust is where projects go wrong.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Every CRM migration looks like a data-transfer problem and turns out to be a modelling problem. The old system encoded assumptions — about what a contact is, about which fields sales actually filled in — and those assumptions do not survive the export.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Profile before you map</h3>
          <p>Before writing a single transform, count what is actually in each field. You will typically find columns that are ninety percent empty, free-text fields carrying structured meaning, and duplicate records that the old unique constraint never caught. Map against reality, not against the schema diagram.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Run it twice before you run it once</h3>
          <p>Do a full dry run into a sandbox with production-sized data, then reconcile record counts and spot-check the relationships that matter — deals to accounts, activities to owners. The dry run is where you discover that the timestamp column was local time in one system and UTC in the other.</p>
          <p>Keep the old system readable for a quarter after cutover. It costs very little and it is the difference between answering a customer question and guessing at it.</p>
        </div>
      ),
    },
    VI: {
      title: "Di trú dữ liệu CRM mà không mất lịch sử",
      category: "Dữ liệu",
      date: "9 Tháng 7, 2026",
      readTime: "7 phút đọc",
      desc: "Bản thân việc chuyển dữ liệu là phần dễ. Giữ được quan hệ, mốc thời gian và niềm tin mới là chỗ các dự án đổ vỡ.",
      content: (
        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
          <p>Mọi cuộc di trú CRM trông như một bài toán chuyển dữ liệu, nhưng hóa ra lại là bài toán mô hình hóa. Hệ thống cũ đã mã hóa sẵn các giả định — thế nào là một liên hệ, trường nào thực sự được đội sale điền — và những giả định đó không sống sót qua bước xuất dữ liệu.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Khảo sát dữ liệu trước khi ánh xạ</h3>
          <p>Trước khi viết một phép biến đổi nào, hãy đếm xem thực tế trong mỗi trường có gì. Bạn thường sẽ tìm thấy những cột trống đến chín mươi phần trăm, những trường văn bản tự do đang gánh ý nghĩa có cấu trúc, và các bản ghi trùng mà ràng buộc unique cũ chưa bao giờ bắt được. Hãy ánh xạ theo thực tế, không theo sơ đồ schema.</p>
          <h3 className="text-2xl text-white font-medium mt-12 mb-4">Chạy thử hai lần trước khi chạy thật một lần</h3>
          <p>Hãy chạy thử toàn bộ vào môi trường sandbox với lượng dữ liệu bằng production, rồi đối soát số lượng bản ghi và kiểm tra ngẫu nhiên các quan hệ quan trọng — cơ hội gắn với khách hàng, hoạt động gắn với người phụ trách. Lần chạy thử chính là lúc bạn phát hiện cột mốc thời gian ở hệ thống này là giờ địa phương còn hệ thống kia là UTC.</p>
          <p>Hãy giữ hệ thống cũ ở chế độ đọc được thêm một quý sau khi chuyển đổi. Chi phí rất nhỏ, nhưng đó là khác biệt giữa việc trả lời được câu hỏi của khách hàng và việc phải đoán.</p>
        </div>
      ),
    },
  },
];

/** Remote images can 404 — degrade to a branded panel instead of a broken icon. */
function PostImage({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/25 via-black to-secondary/20">
        <span className="text-2xl font-bold tracking-[0.3em] text-white/25">SID</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export function Blog() {
  const { t, language } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [expanded, setExpanded] = useState(false);
  const lenis = useLenis();

  const shownPosts = expanded ? posts : posts.slice(0, VISIBLE_COUNT);
  const hasMore = posts.length > VISIBLE_COUNT;

  const closeModal = useCallback(() => setSelectedPost(null), []);

  useGSAP(
    () => {
      // Per-card triggers so the second row animates when it is actually reached.
      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    },
    { scope: container, dependencies: [shownPosts.length] }
  );

  // Modal side effects: scroll lock, Escape, and focus handling.
  useEffect(() => {
    if (!selectedPost) return;

    // Lenis drives scrolling for the whole page and swallows wheel events, so
    // `overflow: hidden` alone leaves the page scrolling behind the modal while
    // the modal's own scroll container never receives anything. Stop it outright.
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    lastFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      lastFocused.current?.focus();
    };
  }, [selectedPost, lenis, closeModal]);

  return (
    <>
      <section id="blog" ref={container} className="w-full bg-black py-32 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-medium tracking-widest text-secondary uppercase mb-4">
                {t("blog.tag")}
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-medium leading-tight">
                {t("blog.title")}
              </h3>
            </div>
            {hasMore && !expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors group pb-2 border-b border-primary/30 hover:border-white"
              >
                {t("blog.viewAll")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shownPosts.map((post) => {
              const langData = post[language];
              return (
                <button
                  key={post.id}
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setSelectedPost(post)}
                  className="blog-card group w-full cursor-pointer border-t border-white/10 pt-8 text-left transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none"
                >
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                    <PostImage
                      src={post.img}
                      alt={langData.title}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <span className="text-primary font-medium">{langData.category}</span>
                    <span>{langData.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {langData.readTime}
                    </span>
                  </div>
                  <h4 className="text-2xl font-medium mb-4 group-hover:text-primary transition-colors leading-tight">
                    {langData.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{langData.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                    {t("blog.read")}
                    <ArrowRight
                      size={14}
                      className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {hasMore && !expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="md:hidden mt-12 w-full py-4 border border-white/20 rounded-full flex justify-center items-center gap-2 hover:bg-white/5 transition-colors"
            >
              {t("blog.viewAll")}
            </button>
          )}
        </div>
      </section>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <div className="absolute inset-0 cursor-pointer" onClick={closeModal} aria-hidden="true" />
          <div
            ref={dialogRef}
            /* Lenis skips wheel events inside this subtree so the article scrolls natively. */
            data-lenis-prevent
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[#001020] border border-white/10 rounded-3xl shadow-2xl z-10 custom-scrollbar"
            style={{ animation: "fadeUp 0.4s ease-out forwards" }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label={t("blog.close")}
              className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-[40vh] md:h-[50vh]">
              <PostImage
                src={selectedPost.img}
                alt={selectedPost[language].title}
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001020] via-[#001020]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                  <span className="text-primary font-bold tracking-wider uppercase">
                    {selectedPost[language].category}
                  </span>
                  <span>•</span>
                  <span>{selectedPost[language].date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {selectedPost[language].readTime}
                  </span>
                </div>
                <h2
                  id="blog-modal-title"
                  className="text-3xl md:text-5xl font-heading font-medium text-white leading-tight"
                >
                  {selectedPost[language].title}
                </h2>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto">{selectedPost[language].content}</div>
            </div>
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.2);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.2);
            }
          `,
            }}
          />
        </div>
      )}
    </>
  );
}
